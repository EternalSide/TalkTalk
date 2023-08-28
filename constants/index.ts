export const sidebarLinks = [
	{
		imgURL: '/assets/home.svg',
		route: '/',
		label: 'Главная',
	},
	{
		imgURL: '/assets/search.svg',
		route: '/search',
		label: 'Поиск',
	},
	{
		imgURL: '/assets/heart.svg',
		route: '/activity',
		label: 'Ответы',
	},
	{
		imgURL: '/assets/create.svg',
		route: '/create-thread',
		label: 'Опубликовать',
	},
	{
		imgURL: '/assets/community.svg',
		route: '/communities',
		label: 'Сообщества',
	},
	{
		imgURL: '/assets/user.svg',
		route: '/profile',
		label: 'Профиль',
	},
];

export const profileTabs = [
	{ value: 'Threads', label: 'Talk', icon: '/assets/reply.svg' },
	{ value: 'Replies', label: 'Ответы', icon: '/assets/members.svg' },
	{ value: 'Tagged', label: 'Упоминания', icon: '/assets/tag.svg' },
];

export const communityTabs = [
	{ value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
	{ value: 'members', label: 'Members', icon: '/assets/members.svg' },
	{ value: 'requests', label: 'Requests', icon: '/assets/request.svg' },
];
