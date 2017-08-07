const GA = window.ga || (() => null);

export const EVENT_TYPE_FB = 'fb-share';
export const EVENT_TYPE_PRODUCT = 'product';

export function track(eventName, evenType) {
  GA('send', {
    hitType: 'event',
    eventCategory: evenType,
    eventAction: eventName,
    eventLabel: eventName,
  });
}
