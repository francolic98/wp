import { AnimationMetadata, AnimationBuilder, AnimationPlayer, style, animate } from '@angular/animations';
import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFadein]'
})
export class FadeinDirective {
  player!: AnimationPlayer;

  constructor(private builder: AnimationBuilder, private el: ElementRef) { }

  @Input()
  set ActionTrigger(action: string)
  {
    if (this.player)
    {
      this.player.destroy();
    }

    const factory = this.builder.build(this.fadeIn());
    const player = factory.create(this.el.nativeElement);

    if (action != '')
      player.play();  
  }

  private fadeIn(): AnimationMetadata[] 
  {
    return [
      style({ opacity: 0 }),
      animate('400ms ease-in', style({ opacity: 1 }))
    ];
  }
}
