import { ProfessorFormData } from "@/app/(private)/professor/schema";
import { ProfessorPostRequest, ProfessorPutRequest } from "@/services/domains/professor/request";
import { ProfessorDetalheResponse } from "@/services/domains/professor/response";
import { convertDateStringToISO } from "../../../utils/utilsDate";
import { unmaskCEP, unmaskCPF, unmaskPhone, unmaskRG } from "../../../utils/utils";

function buildDadosBancarios(formData: ProfessorFormData) {
  if (!formData.nomeBanco && !formData.tipoConta && !formData.agencia && !formData.conta && !formData.chavePix) {
    return undefined;
  }
  return {
    nomeBanco: formData.nomeBanco || "",
    tipoConta: formData.tipoConta || "",
    agencia: formData.agencia || "",
    conta: formData.conta || "",
    chavePix: formData.chavePix || "",
  };
}

function buildDependentes(formData: ProfessorFormData) {
  if (!formData.dependentes || formData.dependentes.length === 0) {
    return undefined;
  }
  return formData.dependentes.map((dep) => ({
    nomeCompleto: dep.nomeCompleto,
    cpf: unmaskCPF(dep.cpf),
    dataDeNascimento: convertDateStringToISO(dep.dataNascimento),
    parentesco: dep.parentesco,
  }));
}

export function mapFormDataToProfessorPostRequest(
  formData: ProfessorFormData,
): ProfessorPostRequest {
  return {
    cpf: unmaskCPF(formData.cpf),
    rg: unmaskRG(formData.rg),
    nome: formData.nomeCompleto,
    nomeSocial: formData.nomeSocial || "",
    email: formData.email,
    dataDeNascimento: convertDateStringToISO(formData.dataNascimento),
    endereco: {
      logradouro: formData.logradouro,
      bairro: formData.bairro,
      cep: unmaskCEP(formData.cep),
      cidade: formData.cidade,
      uf: formData.uf,
      complemento: formData.complemento || "",
      numero: formData.numero,
    },
    telefones: formData.telefone ? [unmaskPhone(formData.telefone)] : [],
    genero: formData.genero,
    corRaca: formData.corRaca,
    cidadeNaturalidade: formData.cidadeNaturalidade,
    carteiraDeTrabalho: formData.carteiraTrabalho,
    disciplinaIds: formData.disciplinaIds,
    dadosBancarios: buildDadosBancarios(formData),
    dependentes: buildDependentes(formData),
  };
}

export function mapFormDataToProfessorPutRequest(
  formData: ProfessorFormData,
  id: string,
): ProfessorPutRequest {
  return {
    id,
    cpf: unmaskCPF(formData.cpf),
    rg: unmaskRG(formData.rg),
    nome: formData.nomeCompleto,
    nomeSocial: formData.nomeSocial || "",
    email: formData.email,
    dataDeNascimento: convertDateStringToISO(formData.dataNascimento),
    endereco: {
      logradouro: formData.logradouro,
      bairro: formData.bairro,
      cep: unmaskCEP(formData.cep),
      cidade: formData.cidade,
      uf: formData.uf,
      complemento: formData.complemento || "",
      numero: formData.numero,
    },
    genero: formData.genero,
    corRaca: formData.corRaca,
    cidadeNaturalidade: formData.cidadeNaturalidade,
    carteiraDeTrabalho: formData.carteiraTrabalho,
    telefones: formData.telefone ? [unmaskPhone(formData.telefone)] : [],
    disciplinaIds: formData.disciplinaIds,
    dadosBancarios: buildDadosBancarios(formData),
    dependentes: buildDependentes(formData),
  };
}

/**
 * Formata o CPF para o padrão 000.000.000-00
 */
function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, "");
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

/**
 * Formata o CEP para o padrão 00000-000
 */
function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, "");
  return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2");
}

/**
 * Formata o telefone para o padrão (00) 00000-0000 ou (00) 0000-0000
 */
function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
}

/**
 * Converte uma data ISO para o formato dd/mm/yyyy
 */
function convertISOToDateString(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Mapeia os dados do professor da API para o formato do formulário
 */
export function mapProfessorResponseToFormData(
  professor: ProfessorDetalheResponse,
): ProfessorFormData {
  return {
    nomeCompleto: professor.nome || "",
    nomeSocial: professor.nomeSocial || "",
    email: professor.email || "",
    dataNascimento: professor.dataDeNascimento
      ? convertISOToDateString(professor.dataDeNascimento)
      : "",
    genero: professor.genero || "",
    corRaca: professor.corRaca || "",
    cidadeNaturalidade: professor.cidadeNaturalidade || "",
    cpf: professor.cpf ? formatCPF(professor.cpf) : "",
    rg: professor.rg || "",
    carteiraTrabalho: professor.carteiraDeTrabalho || "",
    cep: professor.endereco?.cep ? formatCEP(professor.endereco.cep) : "",
    logradouro: professor.endereco?.logradouro || "",
    numero: professor.endereco?.numero || "",
    complemento: professor.endereco?.complemento || "",
    bairro: professor.endereco?.bairro || "",
    cidade: professor.endereco?.cidade || "",
    uf: professor.endereco?.uf || "",
    telefone:
      professor.telefones && professor.telefones.length > 0
        ? formatPhone(professor.telefones[0])
        : "",
    disciplinaIds: professor.disciplinas?.map((d) => d.id) || [],
    nomeBanco: professor.dadosBancarios?.nomeBanco || "",
    tipoConta: professor.dadosBancarios?.tipoConta || "",
    agencia: professor.dadosBancarios?.agencia || "",
    conta: professor.dadosBancarios?.conta || "",
    chavePix: professor.dadosBancarios?.chavePix || "",
    dependentes:
      professor.dependentes?.map((dep) => ({
        nomeCompleto: dep.nomeCompleto || "",
        cpf: dep.cpf ? formatCPF(dep.cpf) : "",
        dataNascimento: dep.dataDeNascimento
          ? convertISOToDateString(dep.dataDeNascimento)
          : "",
        parentesco: dep.parentesco || "",
      })) || [],
  };
}
