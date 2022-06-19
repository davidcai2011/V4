<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceItemRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InvoiceItemRepository::class)]
#[ApiResource]
class InvoiceItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer')]
    private $Quantity;

    #[ORM\Column(type: 'integer')]
    private $Price;

    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'invoiceItems')]
    #[ORM\JoinColumn(nullable: false)]
    private $Product;

    #[ORM\ManyToOne(targetEntity: Invoice::class, inversedBy: 'invoiceItems')]
    #[ORM\JoinColumn(nullable: false)]
    private $Invoice;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->Quantity;
    }

    public function setQuantity(int $Quantity): self
    {
        $this->Quantity = $Quantity;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->Price;
    }

    public function setPrice(int $Price): self
    {
        $this->Price = $Price;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->Product;
    }

    public function setProduct(?Product $Product): self
    {
        $this->Product = $Product;

        return $this;
    }

    public function getInvoice(): ?int
    {
        return $this->Invoice;
    }

    public function setInvoice(int $Invoice): self
    {
        $this->Invoice = $Invoice;

        return $this;
    }
}
