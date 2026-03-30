import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

/**
 * Main application controller
 * 
 * Handles root route and serves the main application view
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Renders the home page
   * @returns Rendered index view with welcome message
   */
  @Get()
  @Render('index')
  @ApiExcludeEndpoint()
  getHello() {
    return { message: this.appService.getHello() };
  }
}
