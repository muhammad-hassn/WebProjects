using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CarRentalSystem
{
    public partial class Customer : Form
    {
        SqlConnection Con = new SqlConnection(@"Data Source=DESKTOP-6QEB6S6;Initial Catalog=CarRental;Persist Security Info=True;User ID=sa;Password=ker@4080");

        private void populate()
        {
            Con.Open();
            string query = "select * from CustomerTable";
            SqlDataAdapter da = new SqlDataAdapter(query, Con);
            SqlCommandBuilder builder = new SqlCommandBuilder(da);
            var ds = new DataSet();
            da.Fill(ds);
            CustomerDGV.DataSource = ds.Tables[0];
            Con.Close();
        }

        public Customer()
        {
            InitializeComponent();
        }

        private void label2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // back button
            this.Hide();
            Mainfom m = new Mainfom();
            m.Show();
        }

        private void button2_Click(object sender, EventArgs e)
        { 
            // add button
            if (idTb.Text == " " || nameTb.Text == "" || phoneTb.Text == "")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "insert into CustomerTable values ('" + idTb.Text + "', '" + nameTb.Text + "' , '" + adressTb.Text + "' , " + phoneTb.Text + " )";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Customer created sucessfully !");
                    Con.Close();
                    populate();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }
        }

        private void Customer_Load(object sender, EventArgs e)
        {
            populate();
        }

       

        private void button6_Click(object sender, EventArgs e)
        {
            // edit button

            if (idTb.Text == "" || phoneTb.Text == "")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "update CustomerTable set CustName ='" + nameTb.Text + "' , CustAdd ='" + adressTb.Text +  "' , phone = " + phoneTb.Text + "  where Custid ='" + idTb.Text + "';";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Customer sucessfully Updated !");
                    Con.Close();
                    populate();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }
        }

        private void CustomerDGV_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            idTb.Text = CustomerDGV.SelectedRows[0].Cells[0].Value.ToString();
            nameTb.Text = CustomerDGV.SelectedRows[0].Cells[1].Value.ToString();
            adressTb.Text = CustomerDGV.SelectedRows[0].Cells[2].Value.ToString();
            phoneTb.Text = CustomerDGV.SelectedRows[0].Cells[3].Value.ToString();
        }

        private void button5_Click(object sender, EventArgs e)
        { // delete button
            if (idTb.Text == " " || nameTb.Text == "")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "delete from CustomerTable where Custid = '" + idTb.Text + "';";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Customer Deleted sucessfully !");
                    Con.Close();
                    populate();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }

        }
    }
}
