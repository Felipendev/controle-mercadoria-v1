import { StatusProduto } from './status-produto.enum';
export interface Cliente{
    id: number;
    nome: string;
    sobrenome: string;
    codigo: number;
    dataRecebimento: Date;
    dataEntrega: Date;
    contato: number;
    statusProduto: StatusProduto;
}
