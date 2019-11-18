import React from 'react'

import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import '../../assets/styles/components/Notification.scss'

/**
 * Envoie une notification de type toast dans l'application
 *
 * @example AddToast({ message: "L'événement a été ajouté à votre liste", bg: 'info' })
 * @param {object} option
 */
export const AddToast = option => {
	store.addNotification({
		content: (
			<div className={'Notification ' + 'bg-' + (option.bg || 'info')}>
				<div>
					<span>{option.message}</span>
				</div>
			</div>
		),
		container: 'top-left', // where to position the notifications
		animationIn: ['animated', 'fadeIn'], // animate.css classes that's applied
		animationOut: ['animated', 'fadeOut'], // animate.css classes that's applied
		dismiss: {
			duration: 6000,
			pauseOnHover: true
		}
	})
}

/**
 * Envoie une notification native à l'ordinateur
 *
 * @example AddNotification({ title: 'test', body: 'Bien joué', icon: true, onClick: () => console.log('testing') })
 * @param {object} option
 */
export const AddNotification = option => {
	var path = require('path')
	let notification = new Notification(option.title, {
		body: option.body || undefined,
		icon: option.icon ? path.join(__dirname, 'logo.png') : undefined
	})

	if (option.onClick != null) {
		notification.onclick = option.onClick()
	}
}
