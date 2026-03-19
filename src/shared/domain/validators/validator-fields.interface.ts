export type FieldsErrors = {
  [filed: string]: string[];
};

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors;
  validateData: PropsValidated;
  validate(props: any): boolean;
}
