import { EntityRepository, Repository } from 'typeorm';
import { GroupMember } from './group-member.entity';

@EntityRepository(GroupMember)
export class GroupMemberRepository extends Repository<GroupMember> {}
