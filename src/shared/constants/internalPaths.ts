enum PathKeys {
	Home = 'home',
	Login = 'login',
	Signup = 'signup',
	NotFound = 'notFound',
}

type InternalPathsType = {
	[key in PathKeys]: string;
};

export const internalPaths: InternalPathsType = {
	[PathKeys.Home]: '/',
	[PathKeys.Login]: '/login',
	[PathKeys.Signup]: '/signup',
	[PathKeys.NotFound]: '*',
};
