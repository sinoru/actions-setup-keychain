"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const IS_MACOS = process.platform === 'darwin';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!IS_MACOS) {
                throw new Error(`${process.platform} is not supported!`);
            }
            let keychainName = core.getInput('keychain-name');
            let keychainPassword = core.getInput('keychain-password');
            let keychainTimeout = core.getInput('keychain-timeout');
            yield exec.exec('security', ['create-keychain', '-p', keychainPassword, keychainName]);
            yield exec.exec('security', ['default-keychain', '-s', keychainName]);
            yield exec.exec('security', ['unlock-keychain', '-p', keychainPassword, keychainName]);
            yield exec.exec('security', ['set-keychain-settings', '-t', keychainTimeout, '-u', keychainName]);
            core.setOutput('keychain-name', keychainName);
            core.setOutput('keychain-password', keychainPassword);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
