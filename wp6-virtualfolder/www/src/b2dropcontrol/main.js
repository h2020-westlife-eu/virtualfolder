/**
 * Created by vagrant on 9/6/16.
 */

export function configure(aurelia) {
    aurelia.use.basicConfiguration()
        .developmentLogging();
    aurelia.start().then(() => aurelia.setRoot());

}

