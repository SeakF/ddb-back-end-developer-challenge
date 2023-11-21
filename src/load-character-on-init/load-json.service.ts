import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoadJsonService {
    loadFile(pathToFile: string) {
        try {
            const file = fs.readFileSync(pathToFile);
            const fileName = path.parse(pathToFile).name;
            return {
                fileName,
                file: JSON.parse(file.toString())
            };
        } catch (e) {
            throw new Error(`File not loaded correctly:\n${e}`);
        }
    }
}
