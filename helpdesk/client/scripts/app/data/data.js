define(['dateFormat'],function (dateFormat) {

  var formattedDate = dateFormat(new Date(), "dd mmm yyyy h:MM TT");
  
  return {

    menu: [
      {id: '1', name: 'menu-button-home', class: 'menu active', label: 'Home'}, 
      {id: '2', name: 'menu-button-logCall', class: 'menu inactive', label: 'Log a call'}, 
      {id: '3', name: 'menu-button-openCalls', class: 'menu inactive', label: 'View open calls'}, 
      {id: '4', name: 'menu-button-reports', class: 'menu inactive', label: 'View reports'},
      {id: '5', name: 'menu-button-search', class: 'menu inactive', label: 'Search'}
    ],

    home: [
      {callid: '1', date: formattedDate, text: 'Welcome to the Rez Help Desk, a single-page experimental ITIL application developed in Backbone.js.\n\nLog a call, view currently open calls, run a report, or search.'},
    ],
    
    testCalls: [
      {callid: 1, 
        date: formattedDate, 
        service: 'SMART', 
        client: 'Andy Willis',
        priority: 1, 
        summary: 'SMART is down', 
        description: 'The server room blew up and there are gremlims climbing over the racks.\n\nWhat kind of lunacy has been able to breed within these four walls?\n\nI would like your best support engineer to come down and kill these creatures immediately.', 
        notes: [ 
          {author: 'Andy Willis', date: formattedDate, text: 'Hi'}, 
          {author: 'George Bernard Shaw', date: formattedDate, text: 'Hallo'}, 
          {author: 'Bob Carolgees', date: formattedDate, text: 'This is a note added by the administrator of this help desk with the hope that somewhere someone will read it.'} 
        ]},
      {callid: '2', date: formattedDate, service: 'Lawtel', client: 'Andy Willis', priority: 3, summary: 'Lawtel spelling error', description: 'Page 9, paragraph 16, \'hole\' should be \'whole\''},
      {callid: '3', date: formattedDate, service: 'WLUK', client: 'Andy Willis', priority: 1, summary: 'WLUK is dead!', description: 'Sucked into a vortex.'},
      {callid: '4', date: formattedDate, service: 'Localaw', client: 'Andy Willis', priority: 2, summary: 'Localaw links dead', description: 'All the links on the front page.'},
      {callid: '5', date: formattedDate, service: 'Legislation', client: 'Andy Willis', priority: 1, summary: 'Legislation is down', description: 'Boss running loose in the content-delivery room with a blunt axe.' },
      {callid: '6', date: formattedDate, service: 'Corporate site', client: 'Andy Willis', priority: 3, summary: 'Gradients now!', description: 'Needs more CSS3 gradient.'},
      {callid: '7', date: formattedDate, service: 'CAWCC', client: 'Andy Willis', priority: 1, summary: 'Content centre missing', description: 'Last seen in the company of a dinosaw and a trio of nannies.'},
      {callid: '8', date: formattedDate, service: 'Civil Procedure', client: 'Andy Willis', priority: 2, summary: 'Anarchy', description: 'Delete the product and replace with the Hacker\'s Handbook.'}
    ],

    testReports: [
      {reportid: '1', service: 'SMART', summary: 'SMART open calls'},
      {reportid: '2', service: 'Lawtel', summary: 'SMART closed calls'},
      {reportid: '3', service: 'WLUK', summary: 'WLUK closed p1 calls'},
      {reportid: '4', service: 'Localaw', summary: 'Localaw open p1 calls'}
    ]

  }

});