import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProfileRepository } from '../../entities/profile.repository';
import { UserRepository } from 'src/modules/users/entities/user.repository';
import { AppLoggerService } from 'src/modules/logger/logger.service';
import { AppErrorService } from 'src/modules/error/error.service';
import { EventTypesEnum, ProfileResponse } from 'src/interface';
import { CreateHistoryCommand } from 'src/modules/history/command/impl/create-history.command';
import { UpdateProfileCommand } from '../impl/update-profile-command';
import { getChangedFields } from 'src/utils/diff.util';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(
    private readonly profileRepo: ProfileRepository,
    private readonly userRepo: UserRepository,
    private readonly logger: AppLoggerService,
    private readonly errorService: AppErrorService,
    private readonly commandBus: CommandBus,
  ) {
    this.logger.setContext(UpdateProfileHandler.name);
  }

  async execute(command: UpdateProfileCommand): Promise<ProfileResponse> {
    const { profileId, payload } = command;
    const existingProfile = await this.profileRepo.findOne({
      where: { id: profileId },
      relations: ['user'],
    });
    console.log(profileId, payload, '@@@@@@');

    if (!existingProfile) {
      this.logger.error(`Profile not found: profileId ${profileId}`, '');
      throw this.errorService.throwNotFoundError('Profile not found');
    }

    try {
      const { oldValue, newValue } = getChangedFields(existingProfile, payload);

      // Update the profile with new values
      Object.assign(existingProfile, payload);

      // Save the updated profile
      const updatedProfile = await this.profileRepo.save(existingProfile);

      // Log the changes in the history
      await this.commandBus.execute(
        new CreateHistoryCommand(
          EventTypesEnum.ProfileUpdatedEvent,
          existingProfile.user.id,
          oldValue,
          newValue,
        ),
      );

      return {
        data: updatedProfile,
        message: 'Profile successfully updated.',
      } as ProfileResponse;
    } catch (error) {
      this.logger.error(
        `Failed to update profile for profileId: ${profileId}`,
        error.stack,
      );
      throw error;
    }
  }
}
