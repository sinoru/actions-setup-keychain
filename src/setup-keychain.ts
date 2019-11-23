import * as core from '@actions/core';
import * as exec from '@actions/exec';

const IS_MACOS = process.platform === 'darwin';

async function run() {
  try {
    if (!IS_MACOS) {
      throw new Error(`${process.platform} is not supported!`);
    }

    let keychainName = core.getInput('keychain-name');
    let keychainPassword = core.getInput('keychain-password');
    let keychainTimeout = core.getInput('keychain-timeout');

    await exec.exec('security', [
      'create-keychain',
      '-p',
      keychainPassword,
      keychainName
    ]);
    await exec.exec('security', ['default-keychain', '-s', keychainName]);
    await exec.exec('security', [
      'unlock-keychain',
      '-p',
      keychainPassword,
      keychainName
    ]);
    await exec.exec('security', [
      'set-keychain-settings',
      '-t',
      keychainTimeout,
      '-u',
      keychainName
    ]);

    core.setOutput('keychain-name', keychainName);
    core.setOutput('keychain-password', keychainPassword);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
