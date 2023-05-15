#include <iostream>     //主要用于输入输出流操作，包括cout和cin等函数
#include <fstream>   //主要用于文件读写操作，包括ifstream和ofstream等函数。
#include <string>     //主要用于字符串操作，包括string类型和getline等函数。
#include <vector>  //主要用于字符串操作，包括string类型和getline等函数。
#include <cstdlib>  //主要用于动态数组操作，包括vector类型和push_back等函数。
#include <ctime> // 主要用于随机数生成，包括srand和rand等函数

#include<map> 

using namespace std;

bool Log_Sign_User(string username) 
    {
    ifstream file("users.txt");
    string line;
    bool exists = false;
    
    while (getline(file, line)) 
	{
        if (line == username) 
		{
            exists = true;//存在就改成针织 
            break;
        }
    }
    
    file.close();
    
    if (exists) //返回针织就执行 
	{
        cout << "用户名已经存在，请重新主材" << endl << endl;
        return false;
    } 
	else //假肢则把新用户名录入 
	{
        ofstream outfile("users.txt", ios::app);
        outfile << username << endl;
        outfile.close();
        cout << "注册成功，欢迎使用漂流瓶！" << endl;
        return true;
    }
}


void throwBottle()
{
    // 获取用户输入
   //zxy：建议功能注释写里面别写旁边看着顺一些
  //zxy：具体一些函数使用写旁边
    string message;                                        //message是一个string类型变量，存储用户输入的消息
    cout << "请输入你要扔出去的消息：" << endl;//cin 输入流 
    getline(cin >> ws, message);//cin输入流，ws一个标准库函数表示忽略输入缓冲区中的所有空格字符直到遇到第一个非空格字符。 
                                //message 是一个 string 类型的变量，存储用户输入的消息。 
    // 打开文件
    ofstream file;//创建一个ofstream对象file 
    file.open("message.txt", ios::app);//file打开message.txt文件，ios::app标志打开文件时会将写操作（将数据存入存储器）附加到文件末尾（写入时采用追加方式），保留文件中已有的内容。

    // 将消息写入文件
    file << message << endl;//写操作，然后换行 

    // 关闭文件
    file.close();//file.open()打开文件file.close()关闭文件 

    cout << "你的消息已经被漂流瓶扔出去了！" << endl;//cout输出流打印这段消息 
}


void takeBottle()
{
    // 打开文件
    ifstream file;//创建一个ifstream对象file，和ofstream对象file创建类似 
    file.open("message.txt");//打开message.txt文件，默认的文件打开模式 ios::in表示打开文件进行读取操作

    // 读取文件中的消息
    vector<string> messages;//创建一个空的字符串向量 messages用来存储从文件中读取的所有消息
    string line;//定义一个字符串变量 line，用来存储从文件中读取的每一行消息
    while (getline(file, line))//循环读取文件中的每一行消息，读取成功就继续循环，失败就退出 
    {
        messages.push_back(line);//将读取到的消息存储到字符串向量messages中
    }

    // 随机选择一条消息
    if (messages.size() > 0)//messages非空有漂流瓶
    {
        srand(time(NULL));//生成一个随机的漂流瓶索引index，随机选择一条漂流瓶消息
        int index = rand() % messages.size();//srand()函数初始化随机数生成器，time(NULL)函数返回当前时间作为 srand()函数的种子，系统时间每次都不一样，因此能实现随机效果rand()函数用来生成随机数
        cout << "你捡起了一条漂流瓶，里面的消息是：" << messages[index] << endl;//
    }
    else
    {
        cout << "没有漂流瓶可供捡起。" << endl;//
    }

    // 关闭文件
    file.close();//周啸宇：这几个函数逻辑都很简单，基本只涉及一两个分支和1一两个条件判断，注释也有，可以自己理解画图，我负责画main 
}








int main()
{
    system("setterm -foreground black");
	string username;
    cout << "输入用户名: ";
    cin >> username;
    Log_Sign_User(username);//名字打错了 
	
	
    bool quit = false;//quit布尔型变量，初值为false 
    while (!quit)//非false为true 
    {
        cout << "请选择你想要的操作：" << endl;//
        cout << "请注意不要在输入的信息中留有空格" << endl; //最好不要，但是貌似没太大问题，有一次是无限循环格式不匹配没有考虑这种情况，可以新家一个，但是基本使用够了 
        
        cout << "1.注册" << endl;//第四个只能是登录 
		cout << "2. 扔漂流瓶" << endl;//
        cout << "3. 捡漂流瓶" << endl;//
        cout << "4. 退出" << endl;// 
        

        int choice;//保存你的选择 
        cin >> choice;//输入123选择想要的操作 
        
        
        switch (choice)//switch选择 
        {
		    case 1:
            	{
			     string username;
                 cout << "输入用户名:";
                 cin >> username;
                 Log_Sign_User(username);//上一个打错这个拷贝上一个错了 //其实这个LSU函数少一个循环，也好改，给你们来处理没问题 
                }                        //不过改完之后不能放在switch里，要放在最前面，而且还要添加一个登录 
                break;                   //也就是前面一个选择登录或者注册的switch，后面才是进入用户界面来捡扔退 switch 
            case 2:                      //但是保持这个样子也是可以的，逻辑上有小问题，但只限于登陆注册不妨碍基本捡扔退功能实现 
                throwBottle();//输入1，写消息扔瓶子 
                break;//即时打断，只执行这一个语句，下同 
            case 3:
                takeBottle();//输入2，捡瓶子 
                break;
            case 4:
                quit = true;//输入3，quit赋值为true，推出while循环 
                break;    
            
            default://余下所有情况（输入非123），输出无效的选择，跳出switch语句 
                cout << "无效的选择。" << endl;//
                break;
        }
    }

    return 0;
}
