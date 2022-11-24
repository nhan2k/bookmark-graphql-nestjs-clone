import { Injectable } from '@nestjs/common';
import { getLinkPreview } from 'link-preview-js';
import { GetLinkArgs } from './dto/args/get-links.args.dto';

@Injectable()
export class LinksService {
  async getLinks(getLinkArgs: GetLinkArgs) {
    return Promise.all(
      getLinkArgs.urls.map(async (url) => {
        return getLinkPreview(url);
      }),
    );
  }
}
