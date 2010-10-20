function testPage()
{
	input1=document.getElementById('input1');
	input2=document.getElementById('input2');
	input3=document.getElementById('input3');
	input4=document.getElementById('input4');
	document.getElementById('output1').value=
		calc24(input1.value,input2.value,input3.value,input4.value);
}

function calc24(in1, in2, in3, in4)
{
	var result='';
	
	var n = new Array();
	n[0]=parseInt(in1);
	n[1]=parseInt(in2);
	n[2]=parseInt(in3);
	n[3]=parseInt(in4);

	/* operations:
	 * 0 - addition		
	 * 1 - subtraction	
	 * 2 - multiplication	
	 * 3 - division		
	 * 4 - exponentiation	
	 * 5 - root	(not implemented yet)
	 */

	/* nested loop iterators:
	 * a - first number
	 * b - second number
	 * c - third number
	 * d - fourth number
	 * f - first operation
	 * g - second operation
	 * h - third operation
   * plus try both associativity options:
   *  (A x B) x (C x D)
   *  ((A x B) x C) x D
	 */

	var a=0; b=0; c=0; d=0; f=0; g=0; h=0;
	for (a=0; a<4; a++)
	{
		for (b=0; b<4; b++)
		{
			if (b==a) continue;
			for (c=0; c<4; c++)
			{
				if ((c==a) || (c==b)) continue;
				d=6-(a+b+c);
				for (f=0; f<5; f++)
				{
					for (g=0; g<5; g++)
					{
						for (h=0; h<5; h++)
						{
							if (evaluate(n[a],n[b],n[c],n[d],f,g,h,1)==24)
								result = result+prettyprint(n[a],n[b],n[c],n[d],f,g,h,1)+'\n';
							if (evaluate(n[a],n[b],n[c],n[d],f,g,h,2)==24)
								result = result+prettyprint(n[a],n[b],n[c],n[d],f,g,h,2)+'\n';
						}
					}
				}
			}
		}
	}
	
	return result;
}

function evaluate(in1, in2, in3, in4, oper1, oper2, oper3, assoc)
{
	if (assoc == 1) // (1 o 2) o (3 o 4)
		return eva(eva(in1,in2,oper1),eva(in3,in4,oper3),oper2);
	else if (assoc == 2) // ((1 o 2) o 3) o 4
		return eva(eva(eva(in1,in2,oper1),in3,oper2),in4,oper3);
	else 
		return;
}

function prettyprint(in1, in2, in3, in4, oper1, oper2, oper3, assoc)
{
	if (assoc == 1) // (1 o 2) o (3 o 4)
		return '('+in1+getpo(oper1)+in2+')'+getpo(oper2)+'('+in3+getpo(oper3)+in4+')';
	else if (assoc == 2) // ((1 o 2) o 3) o 4
		return '(('+in1+getpo(oper1)+in2+')'+getpo(oper2)+in3+')'+getpo(oper3)+in4;
	else 
		return;
}

//evaluates in1 oper in2
//e.g. eva(1,2,0) returns 1 + 2
function eva(in1, in2, oper)
{
	switch (oper)
	{
	case 0: 
		return in1 + in2;
	case 1:
		return in1 - in2;
	case 2:
		return in1 * in2;
	case 3:
		return in1 / in2;
	case 4:
		return Math.pow(in1,in2);
	}
}

//Get pretty operator
function getpo(oper)
{
	switch (oper)
	{
	case 0: 
		return '+';
	case 1:
		return '-';
	case 2:
		return '*';
	case 3:
		return '/';
	case 4:
		return '^';
	}
}
