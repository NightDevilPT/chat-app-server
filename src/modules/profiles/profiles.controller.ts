import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequestWithUser } from 'src/interface';

@ApiTags('Profiles')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  create(@Body() payload:CreateProfileDto,@Req() req:RequestWithUser){
    return this.profilesService.create(payload,req.user.id)
  }
}
