var albumService = new Firebase("https://fiery-torch-93.firebaseio.com/");
var albums = m.prop([]);

var app = {};

app.controller = function() {
	albumService.on("value", function(snapshot) {
		m.startComputation();
		albums(snapshot.val());
		console.log(albums());
		m.endComputation();
	});

	return {
		search: function(){
			alert("found something");
		}
	};
};

app.view = function(ctrl) {
	return [
		nav.view(ctrl)
	];
};

var nav = {};
nav.title = "Bandcamp Library";

nav.view = function(ctrl) {
	return m('div[class=app-container]',[
		m('paper-drawer-panel', [
			m('paper-header-panel[drawer]', [
				m('paper-toolbar', {id:'drawerToolbar'}),
				m('paper-menu',[
					m('paper-item', 'About'),
					m('paper-item', 'Second'),
					m('paper-item', 'Third')
				])
			]),
			m('paper-header-panel[main]', [
				m('paper-toolbar', [
					m('paper-icon-button', {icon: 'menu'}),
					m('span', {class:'title'}, nav.title),
					m('paper-icon-button', {icon: 'search', onclick: ctrl.search })
				]),
				pageContent.view(ctrl)
			])
		])
	]);
};

var pageContent = {};

pageContent.view = function(ctrl) {
	var albumList = [];
	_.forEach(albums(), function(val, key){
		albumList.push(m('bandcamp-player',{
			albumid:key.toString(),
			size: "large",
			bgcolor: "000000",
			linkcolor: "0687f5"
		}));
	});

	return albumList;
};

window.addEventListener("WebComponentsReady", function() {
	var appElement = document.getElementById('app');
    m.mount(appElement, app);
});
