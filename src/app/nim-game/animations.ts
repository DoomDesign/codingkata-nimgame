import { trigger, transition, query, stagger, animateChild } from "@angular/animations";

export const listStaggerChildren = trigger('list', [
			transition('void => *', [
				query('@animate',
					stagger(50, animateChild()),
					{ optional: true }
				)
			])
		]);