app.controller("TripController", ['$http','$filter', '$q', function($http, $filter, $q) {
console.log('TripController started');
var self = this;
self.status = {};
self.status.isOuterGroup1Open = true;
self.status.isOuterGroup2Open = true;
console.log(self.status);

  self.users = [
    {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
    {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
    {id: 3, name: 'awesome user3', status: 2, group: null}
  ];

  // self.teams = []

  self.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ];

    self.groups = [
      {value: 1, text: 'admin'},
      {value: 2, text: 'vip'},
      {value: 3, text: 'peon'},
    ];
  // self.loadGroups = function() {
  //   return self.groups.length ? null : $http.get('/groups').success(function(data) {
  //     self.groups = data;
  //   });
  // };

  self.showGroup = function(user) {
    if(user.group && self.groups.length) {
      var selected = $filter('filter')(self.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  self.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')(self.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  self.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  // filter users to show
  self.filterUser = function(user) {
    return user.isDeleted !== true;
  };

  // mark user as deleted
  self.deleteUser = function(id) {
    console.log('delete user');
    var filtered = $filter('filter')(self.users, {id: id});
    console.log('filtered:', filtered);
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };

  // add user
  self.addUser = function() {
    console.log('add user');
    self.users.push({
      id: self.users.length+1,
      name: '',
      status: null,
      group: null,
      isNew: true
    });
  };

  // cancel all changes
  self.cancel = function() {
    for (var i = self.users.length; i--;) {
      var user = self.users[i];
      // undelete
      if (user.isDeleted) {
        delete user.isDeleted;
      }
      // remove new
      if (user.isNew) {
        self.users.splice(i, 1);
      }
    }
  };

  // save edits
  self.saveTable = function() {
    var results = [];
    for (var i = self.users.length; i--;) {
      var user = self.users[i];
      // actually delete user
      if (user.isDeleted) {
        self.users.splice(i, 1);
      }
      // mark as not new
      if (user.isNew) {
        user.isNew = false;
      }

      // send on server
      results.push($http.post('/saveUser', user));
    }

    return $q.all(results);
  };









self.items = [
                    {
                        name: "item1",
                        desc: "Item 1",
                        subitems: [
                            {
                                name: "subitem1",
                                desc: "Sub-Item 1",
                                subitems: [
                                    {
                                        name: "subitem1",
                                        desc: "Sub-Item 1"
                                    },
                                    {
                                        name: "subitem2",
                                        desc: "Sub-Item 2"
                                    },
                                    {
                                        name: "subitem2",
                                        desc: "Sub-Item 2"
                                    }]
                            },
                            {
                                name: "subitem2",
                                desc: "Sub-Item 2",
                                subitems: [
                                    {
                                        name: "subitem1",
                                        desc: "Sub-Item 1"
                                    },
                                    {
                                        name: "subitem2",
                                        desc: "Sub-Item 2"
                                    },
                                    {
                                        name: "subitem2",
                                        desc: "Sub-Item 2"
                                    }]

                            },
                            {
                                name: "subitem2",
                                desc: "Sub-Item 2",
                                subitems: [
                                    {
                                        name: "subitem1",
                                        desc: "Sub-Item 1"
                                    },
                                    {
                                        name: "subitem2",
                                        desc: "Sub-Item 2"
                                    },
                                    {
                                        name: "subitem2",
                                        desc: "Sub-Item 2"
                                    }]

                            }]
                    },
                    {
                        name: "item2",
                        desc: "Item 2",
                        subitems: [
                            {
                                name: "subitem1",
                                desc: "Sub-Item 1"
                            },
                            {
                                name: "subitem2",
                                desc: "Sub-Item 2"
                            },
                            {
                                name: "subitem2",
                                desc: "Sub-Item 2"
                            }]
                    },
                    {
                        name: "item3",
                        desc: "Item 3",
                        subitems: [
                            {
                                name: "subitem1",
                                desc: "Sub-Item 1"
                            },
                            {
                                name: "subitem2",
                                desc: "Sub-Item 2"
                            },
                            {
                                name: "subitem2",
                                desc: "Sub-Item 2"
                            }]
                    }
                ];

self.default = self.items[2];

self.oneAtATime = true;

self.groups = [{
    title: 'Dynamic Group Header - 1',
    content: 'Dynamic Group Body - 1'
}, {
    title: 'Dynamic Group Header - 2',
    content: 'Dynamic Group Body - 2'
}];

self.items = ['Item 1', 'Item 2', 'Item 3'];

self.addItem = function() {
    var newItemNo = self.items.length + 1;
    self.items.push('Item ' + newItemNo);
};




}]); // END: TripController
