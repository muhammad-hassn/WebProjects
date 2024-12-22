using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;


namespace CarRentalSystem
{
    public partial class User : Form
    {
        public User()
        {
            InitializeComponent();
        }

        private void populate()
        {
            Con.Open();
            string query = "select * from UserTable";
            SqlDataAdapter da = new SqlDataAdapter(query , Con);
            SqlCommandBuilder builder = new SqlCommandBuilder(da);
            var ds = new DataSet();
            da.Fill(ds);
            UserDGV.DataSource = ds.Tables[0];
            Con.Close();
        }


        private void label2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
        SqlConnection Con = new SqlConnection(@"Data Source=DESKTOP-6QEB6S6;Initial Catalog=CarRental;Persist Security Info=True;User ID=sa;Password=ker@4080");
        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void button2_Click(object sender, EventArgs e)
        {
            //ADD button

            if (Uid.Text == " " || Uname.Text == " ")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "insert into UserTable values ("+Uid.Text+" , '"+Uname.Text+"' , '"+Upass.Text+"')";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("User created sucessfully !");
                    Con.Close();
                    populate();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }
        }

        private void User_Load(object sender, EventArgs e)
        {
            populate();
        }

        private void button5_Click(object sender, EventArgs e)
        { 
        //Delete button 

            if (Uid.Text == " ")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "delete from UserTable where id = " + Uid.Text + ";" ;
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("User Deleted sucessfully !");
                    Con.Close();
                    populate();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }

        }

        private void UserDGV_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            Uid.Text = UserDGV.SelectedRows[0].Cells[0].Value.ToString();
            Uname.Text = UserDGV.SelectedRows[0].Cells[1].Value.ToString();
            Upass.Text = UserDGV.SelectedRows[0].Cells[2].Value.ToString();

        }

        private void button6_Click(object sender, EventArgs e)
        {
            //Edit button 


            if (Uid.Text == " ")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "update UserTable set UserName ='"+ Uname.Text+"' , password ='"+Upass.Text+"'   where id = '" + Uid.Text + "';";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("User sucessfully Updated !");
                    Con.Close();
                    populate();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //Back Button
            this.Hide();
            Mainfom m = new Mainfom();
            m.Show();
        }
    }
}