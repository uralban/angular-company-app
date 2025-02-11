export class ObjectFiller {

  static fillPropsFromDTO(thisReference:any, dtoObj:any): void{
    for (let key of Object.keys(thisReference)) {
      thisReference[key] = dtoObj[key];
    }
  }
}
