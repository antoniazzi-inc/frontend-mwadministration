export interface IMultiLanguageConfig {
  showName?: boolean;
  showDescription?: boolean;
  nameLabel?: string;
  descriptionLabel?: string;
  enableUndoBtn?: boolean;
  enableRemoveBtn?: boolean;
  enableSaveBtn?: boolean;
  showLangs?: boolean;
  requiredName?: boolean;
  requiredDescription?: boolean;
}

export class MultiLanguageConfig implements IMultiLanguageConfig {
  constructor (
    public showName?: boolean,
  public showDescription?: boolean,
  public nameLabel?: string,
  public descriptionLabel?: string,
  public enableUndoBtn?: boolean,
  public enableRemoveBtn?: boolean,
  public enableSaveBtn?: boolean,
  public showLangs?: boolean,
  public requiredName?: boolean,
  public requiredDescription?: boolean,
  ) {
    this.showName = this.showName
    this.showDescription = this.showDescription
    this.nameLabel = this.nameLabel ? this.nameLabel : 'labels.name'
    this.descriptionLabel = this.descriptionLabel ? this.descriptionLabel : 'labels.description'
    this.enableUndoBtn = this.enableUndoBtn
    this.enableRemoveBtn = this.enableRemoveBtn
    this.enableSaveBtn = this.enableSaveBtn
    this.showLangs = this.showLangs
    this.requiredName = this.requiredName
    this.requiredDescription = this.requiredDescription
  }
}
