export interface FichaMedicaResponse {
  id: string;
  nome: string;
  dadosPessoaisId: number;
  tipoSanguineo: string;
  necessidadesEspeciais?: string;
  doencasRespiratorias?: string;
  alergiasAlimentares?: string;
  alergiasMedicamentosas?: string;
  laudos?: string;
}
