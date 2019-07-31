class Investor {
	constructor(number, name, total, current, email, pay, datetime){
		this.number = number;
		this.name = name;
		this.total = total;
		this.current = current;
		if(current === undefined) this.current = 0;
		this.email = email;
		this.pay = pay;
		this.datetime = datetime;
	}
}