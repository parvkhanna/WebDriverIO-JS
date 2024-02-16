import allureReporter from '@wdio/allure-reporter';

export class AllureUtil {
  static startStep(title, endStep = null) {
    if (endStep) {
      allureReporter.endStep('passed');
    }
    return allureReporter.startStep(title);
  }
  static endStep(passed = true) {
    if (passed) {
      return allureReporter.endStep('passed');
    } else {
      return allureReporter.endStep('failed');
    }
  }
  static async attachScreenshot(name, path) {
    if (path) {
      const data = await fsp.readFile(path);
      return allureReporter.addAttachment(name, data, 'image/png');
    }
    throw Error('Screenshot path not defined');
  }
  static addArgument(name, value) {

    return allureReporter.addArgument(name, value)

  }

  static owner(teamName) {
    allureReporter.addArgument('Team', teamName.toLowerCase());
    allureReporter.addFeature(teamName.toLowerCase());
  }

}
