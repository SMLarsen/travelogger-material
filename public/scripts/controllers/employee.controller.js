app.controller("EmployeeController", ["$http", "DataFactory", function($http, DataFactory) {
  console.log('employee controller running');
  var self = this;

  self.salaryTotal = 0.00;
	self.empArray = [];
  self.newEmployee = {
    annual_salary: 0.00
  };
  self.currentBudget = DataFactory.currentBudget;
  self.overbudget = false;

  getEmployees();

  // add a new employee
  self.addEmployee = function() {
    var thisEmpSalary = parseFloat(self.newEmployee.annual_salary);
    // global company salaries as monthly
		self.annual_salary = Math.round(thisEmpSalary);

    $http.post('/employees', self.newEmployee)
      .then(function(response) {
        // cool
        console.log('response: ', response.data);
        // make GET request for employee data
        self.newEmployee = {};
        getEmployees();
      },
      function(response) {
        // error
        console.log('ERROR response: ', response.data);
      });
  }

  function getEmployees() {
    $http.get('/employees')
      .then(function(response) {
        self.empArray = response.data;
        updateSalary();
      });
  }

  // remove an employee
  self.toggleActiveEmployee = function(id) {
    console.log('employee id: ', id);
    $http.put('/employees/' + id)
      .then(function(response) {
        console.log('updated employee');
        getEmployees();
      });
  }

  function updateSalary() {
    self.salaryTotal = 0.00;
    self.empArray.forEach(function(employee) {
      if(employee.active) {
        self.salaryTotal += Math.round(employee.annual_salary / 12);
      }
    });
    if(self.salaryTotal > self.currentBudget) {
      self.overbudget = true;
    } else {
      self.overbudget = false;
    }
  }

}]);


// $(document).ready(function() {
// 	var salaryTotal = 0.00;
// 	var empArray = [];

	// $('#employeeForm').on('submit', function(event) {
	// 	event.preventDefault();
	// 	var values = {};
	// 	var thisEmpSalary = 0.00;
  //
	// 	$.each($('#employeeForm').serializeArray(), function(i, field) {
	// 		values[field.name] = field.value;
	// 	});
  //
	// 	thisEmpSalary = parseFloat(values.empSalary);
	// 	salaryTotal += Math.round(thisEmpSalary / 12);
	// 	values.empSalary = Math.round(thisEmpSalary);
  //
	// 	empArray.push(values);
  //
	// 	$('#employeeForm').find('input[type=text], input[type=number]').val('');
	// 	$('#empFirstName').focus();
  //
	// 	updateSalary(salaryTotal);
	// 	appendDom(values);
	// });
//
// 	$('#container').on('click', '.removeEmployee', function() {
// 		var index = $(this).data().id;
// 		var employee = empArray[index];
// 		console.log("This Employee:", employee);
//
// 		salaryTotal -= Math.round(employee.empSalary / 12);
// 		updateSalary(salaryTotal);
//
// 		$(this).parent().remove();
// 	});
//
// 	function updateSalary(salary) {
// 		$('#salaryAmount').text('$ ' + salary);
// 	}
//
//
// 	function appendDom(empInfo) {
// 		$('#container').append('<div></div>');
// 		var $el = $('#container').children().last();
// 		$el.append('<p>' + empInfo.empFirstName + ' ' + empInfo.empLastName + '</p>');
// 		$el.append('<p>' + empInfo.empIDNumber + '</p>');
// 		$el.append('<p>' + empInfo.empJobTitle + '</p>');
// 		$el.append('<p>$' + empInfo.empSalary + '</p>');
//
// 		$el.append('<button class="removeEmployee" data-id="' +
// 			(empArray.length - 1) + '">Remove Me!</button>');
// 	}
//
//
// });
