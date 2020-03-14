import * as fs from "fs";
import {ServerResponse} from "http";

export class Router {
    private static headers: Object = {
        'html': "{'Content-Type': 'text/html' }",
        'css' : "{'Content-Type': 'text/css' }",
        'js' :  "{'Content-Type': 'text/javascript'}",
        'png' : "{'Content-Type': 'image/png'}",
        'jpg' : "{'Content-Type': 'image/jpeg'}",
        'text': "{'Content-Type': 'text/plain'}"
    };
 
    public static routing(path: string, response: ServerResponse): void {
        path = this.urlProcessingOnExceptions(path);
        (path.indexOf('image/') !== -1) ? this.getImage(path, response) : this.getPublicFile(path, response);
    }

    public static urlProcessingOnExceptions(path: string) {
        if (path === '/favicon.ico') path = '/image' + path;
        else if (path === '/') path = '/public/index.html';
        return path;
    }

    private static getHeader(path: string): string {
        try {
            const expansion: string = path.split('.')[1];
            return this.headers[expansion];
        } catch (e) {
            console.error(e.message);
            return this.headers['headers'];
        }
    }

    private static getPublicFile(path: string, response: ServerResponse): void {
        let content: string;
        try {
            content =  fs.readFileSync(`src/Server${path}`, 'utf8');
            response.writeHead(200, this.getHeader(path));
        } catch (e) {
            console.error(e.message);
            response.writeHead(404);
        }
        response.end(content);
    }

    private static getImage(path: string, response: ServerResponse): void {
        let content: Buffer;
        try {
            let content: Buffer = fs.readFileSync(`src/Server${path}`);
            response.writeHead(200, this.getHeader(path));
            response.end(content, 'binary');
        } catch (e) {
            console.error(e.message);
            response.writeHead(404);
        }
        response.end(content);
    }
}