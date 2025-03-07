import Web3 from 'web3';
// @ts-ignore
import calculatorAbi from '../data/calculator_abi.js';

export class CalculatorService {
    private web3: Web3;
    private contract: any;

    constructor(httpProvider: string, contractAddress: string) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
        this.contract = new this.web3.eth.Contract(calculatorAbi, contractAddress);
    }

    public async calculate(params: Record<string, any>): Promise<number> {
        try {
            const response = await this.contract.methods.evaluate(params).call();
            return Number(response);
        } catch (error) {
            console.error('Error while calculating result from contract', error);
            throw new Error('Failed to interact with the contract');
        }
    }
}