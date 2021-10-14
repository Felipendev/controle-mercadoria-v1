import { StatusProduto } from './status-produto.enum';
export interface Cliente{
    id: number;
    nome: string;
    sobrenome: string;
    codigo: number;
    dataRecebimento: Date;
    dataDeEntrega: Date;
    contato: number;
    statusProduto: StatusProduto;
}
