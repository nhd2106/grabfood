import React from 'react'

export default function index() {
    const Call = firebase.database().ref("Call/");

    componentWillMount() {
        
        Call.on("value", (notes) => {
            this.setState({ arr_Tinhtien: [], sum_Tien: 0 });
            var arrData = [];
            notes.forEach((element) => {
              var arrOption = [];
              const key = element.key;
              const id = element.val().id;
              const nameFood = element.val().nameFood;
              const Option = element.val().Option;
              const number = element.val().number;
              const people = element.val().people;
      
              const value_option = firebase.database().ref(`node1/check/${id}`);
              value_option.on("value", (notes1) => {
                var sum = 0;
                notes1.forEach((element1) => {
                  element1.val().Value?.forEach((option) => {
                    if (Option.filter((op) => op === option.name_value).length > 0) {
                      Option.map((op) => {
                        if (op === option.name_value) {
                          const num = Number(option?.price) || 0;
                          sum = num + sum;
                          arrOption.push(option);
                        }
                      });
                    }
                  });
                });
                console.log(sum);
                arrData.push({
                  key: key,
                  id: id,
                  nameFood: nameFood,
                  Option: arrOption,
                  number: number,
                  sum_price_option: sum,
                  people: people,
                });
                console.log(arrData);
                this.setState({
                  dataFirebase: arrData,
                });
              });
            });
          });
    }
   


 
    return (
    <div>index</div>
  )
}
