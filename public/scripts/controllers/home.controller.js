/*jshint esversion: 6 */
app.controller("HomeController", ['NavFactory', function(NavFactory) {

    const navFactory = NavFactory;

    var self = this;

    navFactory.setNav('Home', '#/home', false);

    self.slides = [
        { image: "../../assets/images/DSC00294.jpg" },
        { image: "../../assets/images/DSC00421.jpg" },
        { image: "../../assets/images/DSC00428.jpg" },
        { image: "../../assets/images/DSC00576.jpg" },
        { image: "../../assets/images/DSC00863.jpg" },
        { image: "../../assets/images/DSC02365.jpg" },
        { image: "../../assets/images/DSC04663.jpg" },
        { image: "../../assets/images/DSC08296.jpg" },
        { image: "../../assets/images/DSC00658.jpg" },
        { image: "../../assets/images/DSC01566-2.jpg" },
        { image: "../../assets/images/DSC01324.jpg" },
        { image: "../../assets/images/DSC08886.jpg" },
        { image: "../../assets/images/DSC02459.jpg" },
        { image: "../../assets/images/DSC02810.jpg" },
        { image: "../../assets/images/DSC02643.jpg" },
        { image: "../../assets/images/DSC08528.jpg" },
        { image: "../../assets/images/DSC02665.jpg" },
        { image: "../../assets/images/DSC01981.jpg" },
        { image: "../../assets/images/DSC02024.jpg" },
        { image: "../../assets/images/DSC03034.jpg" },
        { image: "../../assets/images/DSC03507.jpg" },
        { image: "../../assets/images/DSC03633.jpg" },
        { image: "../../assets/images/DSC04139.jpg" },
        { image: "../../assets/images/DSC04160.jpg" },
        { image: "../../assets/images/DSC04565.jpg" },
        { image: "../../assets/images/DSC04573.jpg" },
        { image: "../../assets/images/DSC02139.jpg" },
        { image: "../../assets/images/DSC00576.jpg" }
    ];

    shuffleArray(self.slides);

    // Function to shuffle an array
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    } // End shuffleArray

}]); // END: HomeController