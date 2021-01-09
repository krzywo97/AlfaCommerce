﻿// <auto-generated />

using AlfaCommerce.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AlfaCommerce.Data.Migrations
{
    [DbContext(typeof(StoreContext))]
    [Migration("20201221032653_InitialDatabase")]
    partial class InitialDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:Collation", "Polish_Poland.1250")
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("AlfaCommerce.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Name")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("name");

                    b.Property<int?>("ParentId")
                        .HasColumnType("integer")
                        .HasColumnName("parent_id");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.HasIndex(new[] { "Id" }, "categories_id_uindex")
                        .IsUnique();

                    b.ToTable("categories");
                });

            modelBuilder.Entity("AlfaCommerce.Models.Color", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.HasIndex(new[] { "Id" }, "colors_id_uindex")
                        .IsUnique();

                    b.ToTable("colors");
                });

            modelBuilder.Entity("AlfaCommerce.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("Color")
                        .HasColumnType("integer")
                        .HasColumnName("color");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("name");

                    b.Property<double>("Price")
                        .HasColumnType("double precision")
                        .HasColumnName("price");

                    b.Property<int>("Weight")
                        .HasColumnType("integer")
                        .HasColumnName("weight");

                    b.HasKey("Id");

                    b.HasIndex("Color");

                    b.HasIndex(new[] { "Id" }, "products_id_uindex")
                        .IsUnique();

                    b.ToTable("products");
                });

            modelBuilder.Entity("AlfaCommerce.Models.ProductPhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("ProductId")
                        .HasColumnType("integer")
                        .HasColumnName("product_id");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("character varying(500)")
                        .HasColumnName("url");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex(new[] { "Id" }, "product_photos_id_uindex")
                        .IsUnique();

                    b.ToTable("product_photos");
                });

            modelBuilder.Entity("AlfaCommerce.Models.Category", b =>
                {
                    b.HasOne("AlfaCommerce.Models.Category", "Parent")
                        .WithMany("InverseParent")
                        .HasForeignKey("ParentId")
                        .HasConstraintName("categories_parent_id_fkey");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("AlfaCommerce.Models.Product", b =>
                {
                    b.HasOne("AlfaCommerce.Models.Color", "ColorNavigation")
                        .WithMany("Products")
                        .HasForeignKey("Color")
                        .HasConstraintName("products_colors_id_fk")
                        .IsRequired();

                    b.Navigation("ColorNavigation");
                });

            modelBuilder.Entity("AlfaCommerce.Models.ProductPhoto", b =>
                {
                    b.HasOne("AlfaCommerce.Models.Product", "Product")
                        .WithMany("ProductPhotos")
                        .HasForeignKey("ProductId")
                        .HasConstraintName("product_photos_products_id_fk")
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("AlfaCommerce.Models.Category", b =>
                {
                    b.Navigation("InverseParent");
                });

            modelBuilder.Entity("AlfaCommerce.Models.Color", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("AlfaCommerce.Models.Product", b =>
                {
                    b.Navigation("ProductPhotos");
                });
#pragma warning restore 612, 618
        }
    }
}
