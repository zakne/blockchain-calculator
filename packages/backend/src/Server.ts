import path from 'path';
import express, { Request, Response } from 'express';
import { CalculatorService } from "./CalculatorService";

export class Server {
    private app: express.Application;
    private calculatorService: CalculatorService;

    constructor(infuraURL: string, contractAddress: string) {
        this.app = express();
        this.app.use(express.json());
        this.calculatorService = new CalculatorService(
            infuraURL,
            contractAddress
        );

        this.setupRoutes();
        this.setupStaticFiles();
    }

    private setupRoutes() {
        this.app.post('/calculate', this.handleCalculate.bind(this));
    }

    private setupStaticFiles() {
        this.app.use(express.static(path.join(__dirname, '../../frontend/dist')));
        this.app.get('*', this.handleFrontendRequest.bind(this));
    }

    private async handleCalculate(req: Request, res: Response) {
        try {
            const params = req.body;
            const result = await this.calculatorService.calculate(params);
            res.status(200).json({ result });
        } catch (error) {
            console.error('Error in /calculate endpoint', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    private handleFrontendRequest(req: Request, res: Response) {
        res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
    }

    public start(port: number = 5000) {
        this.app.listen(port, 'localhost', () => {
            console.log(`App is running on \x1b[32mhttp://localhost:${port}\x1b[0m`);
        });
    }
}
