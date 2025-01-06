import { Howl, Howler } from "howler"

export class AudioManage {
  play(src: string) {
    const sound = new Howl({
      src,
      autoplay: true,
      loop: true
    })

    sound.play()
  }
}
