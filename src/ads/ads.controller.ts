import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { JobAd } from './ads.model';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {

    constructor(
        private readonly adsService: AdsService
    ) {}


    @HttpCode(200)
    @Get()
    async findAll(
        @Query() query
    ) {
        try {
            let { search, isPublished } = query
            if (isPublished === undefined) { isPublished = null }
            return await this.adsService.findAllAds(search, isPublished)
        } catch (error) {
            throw new BadRequestException()
        }
    }

    @HttpCode(200)
    @Post()
    async create(@Body() body: JobAd) {
        try {
            await this.adsService.create(body)
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @HttpCode(200)
    @Get(':id')
    async findById(
        @Param('id') id: string,
    ) {
        try {
            return this.adsService.findById(id)
        } catch (error) {
            throw new BadRequestException()
        }
    }

    @HttpCode(200)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: JobAd
    ) {
        try {
            await this.adsService.update(id, body);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @HttpCode(200)
    @Patch(':id')
    async updateStatus(
        @Param('id') id: string,
        @Body() body: any
    ) {
        try {
            await this.adsService.updateStatus(id, body.isPublished);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @HttpCode(204)
    @Delete(':id')
    async delete(
        @Param('id') id: string,
    ) {
        try {
            await this.adsService.delete(id);
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
