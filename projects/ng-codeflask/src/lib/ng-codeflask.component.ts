import { Component, OnInit, forwardRef, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import CodeFlask from 'codeflask';
import { Options } from './ng-codeflask.types';

@Component({
  selector: 'ng-codeflask',
  templateUrl: './ng-codeflask.component.html',
  styleUrls: ['./ng-codeflask.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgCodeflaskComponent), multi: true}
  ],
})
export class NgCodeflaskComponent implements ControlValueAccessor {

  public flaskInstance: any;

  isReadOnly = false;
  isRTL = false;
  hasLineNumber = true;
  useDefaultTheme = true;
  currentLanguage = "html";
  currentCode: any = null;
  afterInit: boolean = false;
  options: Options = {
    defaultTheme: this.useDefaultTheme,
    language: this.currentLanguage,
    lineNumbers: this.hasLineNumber,
    readonly: this.isReadOnly,
    rtl: this.isRTL
  };

  @ViewChild("editor") editorContent: ElementRef;

  writeValue(obj: any): void {
    this.code = obj;
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateChange(this.code);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  emitChanges() {
    this.propagateChange(this.code);
  }

  @Output()
  codeChange = new EventEmitter<any>();

  @Input()
  get code(){
    return this.onGetCode();
  }

  set code(val) {
    this.currentCode = val;
    this.onCodeUpdate(this.currentCode);
    this.codeChange.emit(this.currentCode);
    this.propagateChange(this.currentCode);
  }

  @Input()
  set readonly(val: boolean) {
    this.isReadOnly = val;
    if (this.afterInit === true) {
      if (this.isReadOnly === true) {
        this.onDisableReadonly();
      } else {
        this.onEnableReadonly();
      }
    }
  }

  @Input()
  set rtl(val: boolean) {
    this.isRTL = val;
    if (this.afterInit === true) {
      this.onBuildEditor();
    }
  }

  @Input()
  set linenumbers(val: boolean) {
    this.hasLineNumber = val;
    if (this.afterInit === true) {
      this.onBuildEditor();
    }
  }

  @Input()
  set defaultTheme(val: boolean) {
    this.useDefaultTheme = val;
    if (this.afterInit === true) {
      this.onBuildEditor();
    }
  }

  @Input()
  set language(val: string) {
    this.currentLanguage = val;
    if (this.afterInit === true) {
      this.onUpdateLanguage(this.currentLanguage);
    }
  }

  @Input()
  set addLanguage(prismLanguage: {lang: string, options: any}) {
    this.onAddLanguage(prismLanguage);
  }

  ngAfterViewInit() {
    this.onBuildEditor();
    this.afterInit = true;
  }

  private onBuildEditor() {
    const myDiv: HTMLDivElement = this.editorContent.nativeElement;
    this.flaskInstance = new CodeFlask(myDiv, this.options);
    if (this.currentCode != null) {
      this.onCodeUpdate(this.currentCode);
    }
    this.flaskInstance.onUpdate((code) => {
      this.currentCode = code;
      this.codeChange.emit(this.currentCode);
      this.propagateChange(this.currentCode);
    });
  }

  private onCodeUpdate(val: any): void {
    if (this.flaskInstance != null) {
      this.flaskInstance.updateCode(val);
    }
  }

  private onGetCode(): any {
    if (this.flaskInstance != null) {
      return this.flaskInstance.getCode();
    }
  }

  private onUpdateLanguage(lang: string): void {
    if (this.flaskInstance != null) {
      this.flaskInstance.updateLanguage(lang);
    }
  }

  private onAddLanguage(prismLanguage: {lang: string, options: any}): void {
    if (this.flaskInstance != null) {
      this.flaskInstance.addLanguage(prismLanguage.lang, prismLanguage.options);
    }
  }

  private onDisableReadonly(): void {
    if (this.flaskInstance != null) {
      this.flaskInstance.disableReadonlyMode();
    }
  }

  private onEnableReadonly(): void {
    if (this.flaskInstance != null) {
      this.flaskInstance.enableReadonlyMode();
    }
  }

}
