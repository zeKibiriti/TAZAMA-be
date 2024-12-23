import { Injectable, NotFoundException } from '@nestjs/common';
import { StationsDto } from '../dto/stations.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../entities/station.entity';
import { Region } from '../../regions/entities/region.entity';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationsRepository: Repository<Station>,
  ) {}

  async create(stationsDto: StationsDto): Promise<Station> {
    const newStation = this.stationsRepository.create(stationsDto);
    // Save the station, including the related region
    return this.stationsRepository.save(newStation);
  }


  // async create(stationsDto: StationsDto): Promise<StationsDto> {
  //   const newStation = this.stationsRepository.create(stationsDto);
  //   return this.stationsRepository.save(newStation);
  // }

  async findAll(): Promise<Station[]> {
    // Retrieve stations with their associated regions
    return this.stationsRepository.find({ relations: ['region'] });
  }

  // async findAll(): Promise<{ data: StationsDto[]; total: number }> {
  //   // Retrieve all data and the total count
  //   const [data, total] = await this.stationsRepository.findAndCount();
  //
  //   return {
  //     data,
  //     total,
  //   };
  // }

  async findOne(id: number): Promise<Station> {
    const station = await this.stationsRepository.findOne({
      where: { id },
      relations: ['station', 'region'],
    });
    if (!station) {
      throw new NotFoundException(`Station with ID ${id} not found`);
    }
    return station;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} station`;
  // }

  async update(id: number, stationsDto: StationsDto): Promise<StationsDto> {
    // Find the existing Station
    const existingStation = await this.stationsRepository.findOne({
      where: { id },
      relations: ['region'], // Include the related region
    });

    if (!existingStation) {
      throw new NotFoundException(`Station with ID ${id} not found`);
    }

    // Extract the relational and other fields from the DTO
    const { region, ...rest } = stationsDto;

    if (region) {
      // Retrieve the Region entity by ID
      const regionEntity = await this.stationsRepository.manager
        .getRepository(Region) // Use the Region repository
        .findOne({ where: { id: region.id } }); // Ensure the passed region includes an ID

      if (!regionEntity) {
        throw new NotFoundException(`Region with ID ${region.id} not found`);
      }

      // Update the relationship
      existingStation.region = regionEntity;
    }

    // Update non-relational fields
    Object.assign(existingStation, rest);

    // Save the updated Station to the database
    return await this.stationsRepository.save(existingStation);
  }

  // update(id: number, stationsDto: StationsDto) {
  //   return `This action updates a #${id} station`;
  // }

  async remove(id: number): Promise<{ message: string }> {
    // Find the station to ensure it exists
    const station = await this.stationsRepository.findOne({
      where: { id },
      relations: ['region'], // Load relations to ensure proper checks if needed
    });
    if (!station) {
      throw new NotFoundException(`Station with ID ${id} not found`);
    }
    // Remove the station
    await this.stationsRepository.remove(station);
    return { message: `Station with ID ${id} successfully deleted.` };
  }

  // async remove(id: number): Promise<void> {
  //   const station = await this.findOne(id); // Ensure the record exists
  //   await this.stationsRepository.remove(station);
  // }
}
