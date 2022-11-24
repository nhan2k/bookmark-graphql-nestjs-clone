import { Args, Resolver, Query } from '@nestjs/graphql';
import { GetLinkArgs } from './dto/args/get-links.args.dto';
import { Link } from './link.model';
import { LinksService } from './links.service';

@Resolver(() => Link)
export class LinksResolver {
  constructor(private readonly linkService: LinksService) {}

  @Query(() => [Link], { name: 'links' })
  async getLinks(@Args() getLinksArgs: GetLinkArgs) {
    return this.linkService.getLinks(getLinksArgs);
  }
}
