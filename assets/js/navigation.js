$(document).ready( function() {

  var side_nav_items = [
    { label: 'Operations',
      icon: 'fa-camera-retro',
      href: '/operations',
      caret_html: '<i class="fa fa-chevron-right"></i><i class="fa fa-chevron-down"></i>',
      children: [
        { id: 'ready-to-pick', //not mandatory, used only if you want to explicitly set item as active
          label: 'Ready to pick',
          icon: 'fa-wifi',
          href: '#', //makes entire item clickable to toglle subnav, otherwise only caret toggles it
          children: [
            { label: 'Carrier', icon: 'fa-bell-o', href: '/docs/advanced/navigation' },
            { label: 'Rail', icon: 'fa-cc', href: '#' },
            { label: 'Air', icon: 'fa-circle', href: '#' }
          ]
        },
        { label: 'In transit', icon: 'fa-soccer-ball-o', href: '#' }
      ]
    },
    { label: 'Tracking', icon: 'fa-bus', href: '#' }
  ];

  var top_nav_items = [

  ];

  var SideNav = {
    target: $('.nav-test'), //set to element where you want to attach the nav
    items: side_nav_items,
    html: '',
    attach_events: function(){
      $('.js-subnav-toggle').on('click', SideNav.toggle_children);
    },
    toggle_children: function(e){
      e.preventDefault();

      var $item = $(this).is('span') ? $(this).parent() : $(this);

      $item.parent().toggleClass('open');
      $item.next('.subnav-list').slideToggle();
    },
    set_active: function(){
      if (!$('.current-page').length){
        $('.nav-side').find('[href="' + window.location.pathname + '"]').parent().addClass('current-page');
      }
      $('.current-page').parents('.subnav-list').css('display', 'block');
      $('.current-page').parents('.has-children').addClass('current-page-ancestor open');
    },
    init: function(){
      console.log('Nav init');

      if ($('.side-nav-handler').length){
        console.log('active defined');
        SideNav.active = $('.side-nav-handler').attr('id');
      }

      SideNav.render();
    },
    render: function(){
      SideNav.target.html('<nav class="nav-side"><ul class="nav-list nav-list-root"></ul></nav>');

      $.each(SideNav.items, function(index, item){
        SideNav.html += SideNav.render_item(item);

        if (index === SideNav.items.length-1){
          $('.nav-list-root').html(SideNav.html);

          SideNav.attach_events();
          SideNav.set_active();
        }
      });
    },
    render_item: function(item){
      var active_class = (item.id && (item.id === SideNav.active)) ? ' current-page' : '';
      var has_children = item.children && item.children.length;
      var has_children_class = has_children ? ' has-children' : '';
      var link_class = (has_children && item.href === '#') ? 'js-subnav-toggle' : '';
      var item_html = '<li class="' + has_children_class + active_class + '">';

        item_html += '<a class="nav-side__item ' + link_class + '" href="' + item.href + '">';

        if (item.icon){
          item_html += '<i class="nav-side__item__icon fa ' + item.icon + '"></i>';
        }

        item_html += item.label;

        if (has_children){
          var subnav_toggle_class = item.href !== '#' ? 'js-subnav-toggle' : '';
          var caret_html = item.caret_html ? item.caret_html : '<i class="fa fa-caret-right"></i><i class="fa fa-caret-down"></i>';
          item_html += ' <span class="nav-side__item__toggle ' + subnav_toggle_class + '">' + caret_html + '</span>';
        }

        item_html += '</a>';

        if (has_children){
          item_html += '<ul class="subnav-list">';

          $.each(item.children, function(index, item){
            item_html += SideNav.render_item(item);
          });

          item_html += '</ul>';
        }

        item_html += '</li>';

        return item_html;
    }
  }

  SideNav.init();

});//doc ready end