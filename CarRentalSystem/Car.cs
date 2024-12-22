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

     public partial class Car : Form
    {
        public Car()
        {
            InitializeComponent();
        }

        private void populate()
        {
            Con.Open();
            string query = "select * from CarTbl";
            SqlDataAdapter da = new SqlDataAdapter(query, Con);
            SqlCommandBuilder builder = new SqlCommandBuilder(da);
            var ds = new DataSet();
            da.Fill(ds);
            CarDGV.DataSource = ds.Tables[0];
            Con.Close();
        }
        SqlConnection Con = new SqlConnection(@"Data Source=DESKTOP-6QEB6S6;Initial Catalog=CarRental;Persist Security Info=True;User ID=sa;Password=ker@4080");


        // Encapsulation
        private void InsertCar()
        {
                try
                {
                    Con.Open();
                    string query = "insert into CarTbl values ('" + RegTb.Text + "', '" + brandTb.Text + "' , '" + modelTb.Text + "' ,'" + Availablecb.SelectedItem.ToString() + "', " + priceTb.Text + " )";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Car created sucessfully !");
                    Con.Close();
                    populate();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            
        }
        private void button2_Click(object sender, EventArgs e)
        {
            if (RegTb.Text == " " || modelTb.Text == "" || priceTb.Text == "" || brandTb.Text == " ")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                InsertCar();
                populate();
            }
        }
       
        private void Car_Load(object sender, EventArgs e)
        {
            populate();
            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // back button
            this.Hide();
            Mainfom m = new Mainfom();
            m.Show();
        }

        private void button6_Click(object sender, EventArgs e)
        {
            // Edit button
            if (RegTb.Text == "" || brandTb.Text == "")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "update CarTbl set Brand ='" + brandTb.Text + "' , Model ='" + modelTb.Text + "' , Available ='" + Availablecb.SelectedItem.ToString() + "' , price = " + priceTb.Text + "  where RegNum ='" + RegTb.Text + "';";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Car sucessfully Updated !");
                    Con.Close();
                    populate();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }
        }

        private void CarDGV_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            RegTb.Text = CarDGV.SelectedRows[0].Cells[0].Value.ToString();
            brandTb.Text = CarDGV.SelectedRows[0].Cells[1].Value.ToString();
            modelTb.Text = CarDGV.SelectedRows[0].Cells[2].Value.ToString();
            Availablecb.SelectedItem = CarDGV.SelectedRows[0].Cells[3].Value.ToString();
            priceTb.Text = CarDGV.SelectedRows[0].Cells[4].Value.ToString();         
        }

        private void button5_Click(object sender, EventArgs e)
        {
            // delete button
            if (RegTb.Text == " ")
            {
                MessageBox.Show("Missing informaion !");
            }
            else
            {
                try
                {
                    Con.Open();
                    string query = "delete from CarTbl where RegNum = '" + RegTb.Text + "';";
                    SqlCommand cmd = new SqlCommand(query, Con);
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Car Deleted sucessfully !");
                    Con.Close();
                    populate();
                }
                catch (Exception Myex)
                {
                    MessageBox.Show(Myex.Message);
                }
            }
        }

        private void label2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}
