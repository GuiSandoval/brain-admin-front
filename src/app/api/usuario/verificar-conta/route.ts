import { NextRequest, NextResponse } from "next/server";
import { usuarioApi } from "@/services/api";

export async function GET(request: NextRequest) {
  try {
    // Pega o parâmetro 'codigo' da query string
    const searchParams = request.nextUrl.searchParams;
    const codigo = searchParams.get("codigo");

    // Valida se o código foi fornecido
    if (!codigo) {
      return NextResponse.json(
        { sucesso: false, mensagem: "Código de verificação é obrigatório" },
        { status: 400 },
      );
    }

    // Chama o service que fará a requisição para o backend
    const response = await usuarioApi.verificarConta({ codigo });

    // Retorna a resposta do backend
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Erro na verificação de conta:", error);

    // Trata diferentes tipos de erro
    if (error && typeof error === "object" && "response" in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const apiError = error as any;
      const status = apiError.response?.status || 500;
      const message = apiError.response?.data?.mensagem || "Erro na verificação de conta";

      return NextResponse.json({ sucesso: false, mensagem: message }, { status });
    }

    // Erro genérico
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
