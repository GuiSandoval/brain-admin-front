export interface GradeCurricularPostRequest {
  nome: string;
  versao: string;
  disciplinaIds: number[];
}

export interface GradeCurricularPutRequest extends GradeCurricularPostRequest {
  id: string;
}
