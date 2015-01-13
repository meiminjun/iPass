/**
 * CarouselView
 */
Ext.define('iPass.view.CarouselView', {
	
	extend : 'Ext.carousel.Carousel',
	xtype : 'carouselView',
	config : {
		fullscreen : true,
		locales  : {
            title : 'carouselView.title'
        }
	}
});