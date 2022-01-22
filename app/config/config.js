import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as root from 'app-root-dir';
import * as path from 'path';

const config = () => {
    dotenv.config();
    const env = process.env.NODE_ENV ?? 'development';
    let envDirectory = path.join(root.get(), 'deploy', 'env');
    let file = `${env}.env`;

    if (!fs.existsSync(envDirectory)) {
        envDirectory = path.join(root.get(), 'env');
    }

    if (fs.existsSync(envDirectory)) {
        file = path.join(envDirectory, file);
        if (fs.existsSync(file)) {
            dotenv.config({path: file});
            console.log('Config Loaded')
        }
    } else {
        console.log('File Config Not Found');
    }
}

export default config;
