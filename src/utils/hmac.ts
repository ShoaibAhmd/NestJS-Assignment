import { Logger } from '@nestjs/common';
import { createHmac } from 'crypto';

class HmacService {
  private readonly logger = new Logger(HmacService.name);

  private readonly secret = process.env.HMAC_SECRET;

  createSignature(content: string): string {
    const signature = createHmac('sha256', this.secret)
      .update(content)
      .digest('base64');

    this.logger.log(`Signature created successfully.`);

    return signature;
  }
}

const hmacService = new HmacService();

export default hmacService;
