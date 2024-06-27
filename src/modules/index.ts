import { BlocksModule } from "./blocks/blocks.module";
import { ChatSocketModule } from "./chat-socket/chat-socket.module";
import { FilesModule } from "./files/files.module";
import { GroupMembersModule } from "./group-members/group-members.module";
import { GroupsModule } from "./groups/groups.module";
import { MessagesModule } from "./messages/messages.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { ReadReceiptsModule } from "./read-receipts/read-receipts.module";
import { UsersModule } from "./users/users.module";

export const AllModules = [
	UsersModule,
	ProfilesModule,
	MessagesModule,
	GroupsModule,
	GroupMembersModule,
	ReadReceiptsModule,
	FilesModule,
	ChatSocketModule,
	BlocksModule
]