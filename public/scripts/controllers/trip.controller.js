app.controller("TripController", [function() {
console.log('TripController started');
var self = this;

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
